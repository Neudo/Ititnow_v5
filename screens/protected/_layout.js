import { Slot } from 'expo-router'
export default function ProtectedLayout() {
    console.warn('PROTECTED')
    return <Slot/>
}
