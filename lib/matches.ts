import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile } from './auth';
import { Movie } from './tmdb';

export async function addMovieLike(userId: string, movieId: string): Promise<void> {
  const userRef = doc(db, 'users', userId);
  const userLikesRef = doc(db, 'movieLikes', userId);

  await updateDoc(userLikesRef, {
    likedMovies: arrayUnion(movieId)
  });

  // Check for matches with partners
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data() as UserProfile;

  for (const partnerId of userData.partners) {
    const partnerLikesDoc = await getDoc(doc(db, 'movieLikes', partnerId));
    if (partnerLikesDoc.exists()) {
      const partnerLikes = partnerLikesDoc.data().likedMovies || [];
      if (partnerLikes.includes(movieId)) {
        // It's a match!
        await updateDoc(userRef, {
          [`movieMatches.${partnerId}`]: arrayUnion(movieId)
        });
        await updateDoc(doc(db, 'users', partnerId), {
          [`movieMatches.${userId}`]: arrayUnion(movieId)
        });
      }
    }
  }
}

export async function removeMovieMatch(userId: string, partnerId: string, movieId: string): Promise<void> {
  const userRef = doc(db, 'users', userId);
  const partnerRef = doc(db, 'users', partnerId);

  await updateDoc(userRef, {
    [`movieMatches.${partnerId}`]: arrayRemove(movieId)
  });

  await updateDoc(partnerRef, {
    [`movieMatches.${userId}`]: arrayRemove(movieId)
  });
}

export async function connectWithPartner(userId: string, partnerIdentifier: string): Promise<UserProfile | null> {
  // Search for partner by email or ID
  const usersRef = collection(db, 'users');
  const q = query(
    usersRef,
    where('email', '==', partnerIdentifier)
  );

  const querySnapshot = await getDocs(q);
  let partner: UserProfile | null = null;

  querySnapshot.forEach((doc) => {
    if (doc.id !== userId) {
      partner = doc.data() as UserProfile;
    }
  });

  if (!partner) return null;

  // Update both users' partners arrays
  const userRef = doc(db, 'users', userId);
  const partnerRef = doc(db, 'users', partner.uid);

  await updateDoc(userRef, {
    partners: arrayUnion(partner.uid)
  });

  await updateDoc(partnerRef, {
    partners: arrayUnion(userId)
  });

  return partner;
}

export async function removePartner(userId: string, partnerId: string): Promise<void> {
  const userRef = doc(db, 'users', userId);
  const partnerRef = doc(db, 'users', partnerId);

  await updateDoc(userRef, {
    partners: arrayRemove(partnerId)
  });

  await updateDoc(partnerRef, {
    partners: arrayRemove(userId)
  });

  // Remove all movie matches with this partner
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data() as UserProfile;
  const updatedMovieMatches = { ...userData.movieMatches };
  delete updatedMovieMatches[partnerId];

  await updateDoc(userRef, {
    movieMatches: updatedMovieMatches
  });

  const partnerDoc = await getDoc(partnerRef);
  const partnerData = partnerDoc.data() as UserProfile;
  const updatedPartnerMovieMatches = { ...partnerData.movieMatches };
  delete updatedPartnerMovieMatches[userId];

  await updateDoc(partnerRef, {
    movieMatches: updatedPartnerMovieMatches
  });
} 