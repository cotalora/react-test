import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);

    return context;
}

export function AuthProvider({ children }) {
    const userCollectionRef = collection(db, "users");

    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    const validInfo = () => {
        if (sessionStorage.getItem('info')) {
            setUser(JSON.parse(sessionStorage.getItem('info')));
            navigate('/');
        }
    }

    const signup = async (data) => {
        await createUserWithEmailAndPassword(auth, data.email, data.password).then(res => {
            addDoc(
                userCollectionRef,
                {
                    document: data.documentNumber,
                    firtsLastName: data.firtsLastName,
                    firtsName: data.firtsName,
                    secondLastName: data.secondLastName,
                    secondName: data.secondName,
                    idAuth: res.user.uid,
                    role: 3
                }
            )
        });
    }

    const signupAdmin = async (data) => {
        await createUserWithEmailAndPassword(auth, data.email, data.password).then(res => {
            addDoc(
                userCollectionRef,
                {
                    document: data.documentNumber,
                    firtsLastName: data.firtsLastName,
                    firtsName: data.firtsName,
                    secondLastName: data.secondLastName,
                    secondName: data.secondName,
                    idAuth: res.user.uid,
                    role: 2
                }
            ).then(resA => {
                logout();
                navigate('/login')
            })
        });
    }

    const login = async (eml, pwrd) => {
        await signInWithEmailAndPassword(auth, eml, pwrd).then(async res => {
            const q = query(userCollectionRef, where('idAuth', '==', res.user.uid));
            const da = await getDocs(q);
            da.forEach((doc) => {
                setUser(doc.data());
                sessionStorage.setItem('info', JSON.stringify(doc.data()));
            });
        });
    }

    const logout = async () => {
        sessionStorage.removeItem('info')
        signOut(auth)
    }

    useEffect(() => {
        validInfo();
        onAuthStateChanged(auth, async currentUser => {
            if (currentUser) {
                const q = query(userCollectionRef, where('idAuth', '==', currentUser.uid));
                const da = await getDocs(q);
                da.forEach((doc) => {
                    setUser(doc.data());
                    sessionStorage.setItem('info', JSON.stringify(doc.data()));
                });
            }
        })
    }, [])

    return (
        <authContext.Provider value={{ signup, login, user, logout, signupAdmin }}>
            {children}
        </authContext.Provider>
    );
}