import { signIn, signOut } from 'next-auth/react';

export const handleLogin = () => signIn ('google');
export const handleSignOut = () => signOut();

export const handleSignInWithGithub = () => signIn('github');
export const handleSignOutWithGithub = () => signOut();