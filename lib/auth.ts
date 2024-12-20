import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
  fetchSignInMethodsForEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from './firebase';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  partners: string[];
  movieMatches: { [partnerId: string]: string[] };
}

export async function signUp(email: string, password: string, name: string): Promise<UserProfile> {
  try {
    // Check if email exists
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods.length > 0) {
      if (signInMethods.includes('google.com')) {
        throw new Error('This email is already registered with Google. Please use Google Sign-in.');
      } else {
        throw new Error('This email is already registered. Please sign in instead.');
      }
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || email,
      name,
      partners: [],
      movieMatches: {}
    };

    // Create user profile document
    await setDoc(doc(db, 'users', user.uid), userProfile);
    
    // Initialize movieLikes collection for the user
    await setDoc(doc(db, 'movieLikes', user.uid), {
      likedMovies: []
    });

    return userProfile;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('This email is already registered. Please sign in instead.');
    }
    throw error;
  }
}

export async function signIn(email: string, password: string): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    if (error.code === 'auth/wrong-password') {
      throw new Error('Invalid email or password');
    }
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email');
    }
    throw error;
  }
}

export async function signInWithGoogle(): Promise<UserProfile> {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    // Check if user profile exists
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      // Create new user profile if it doesn't exist
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        name: user.displayName || '',
        partners: [],
        movieMatches: {}
      };

      // Create the user document in Firestore
      try {
        await setDoc(userDocRef, userProfile);
        
        // Initialize movieLikes collection for the user
        await setDoc(doc(db, 'movieLikes', user.uid), {
          likedMovies: []
        });
        
        return userProfile;
      } catch (error) {
        console.error('Error creating user profile:', error);
        throw new Error('Failed to create user profile');
      }
    }

    // Return existing user profile
    return userDoc.data() as UserProfile;
  } catch (error: any) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      throw new Error('This email is already registered with a different sign-in method');
    }
    throw error;
  }
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

export async function getCurrentUser(): Promise<UserProfile | null> {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      // Create profile for existing auth user if it doesn't exist
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        name: user.displayName || '',
        partners: [],
        movieMatches: {}
      };
      await setDoc(doc(db, 'users', user.uid), userProfile);
      return userProfile;
    }
    return userDoc.data() as UserProfile;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
} 