import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { ref, set } from 'firebase/database';
import { getDatabase } from 'firebase/database';

const useRealtimeMessages = (chatId, userId) => {
    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState(false);
    const dbRef = getDatabase();

    useEffect(() => {
        const messagesRef = collection(db, `chats/${chatId}/messages`);
        const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
            const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(messagesData);
        });

        const typingRef = ref(dbRef, `chats/${chatId}/typing/${userId}`);
        const typingListener = onValue(typingRef, (snapshot) => {
            setTypingStatus(snapshot.val() === true);
        });

        return () => {
            unsubscribe();
            typingListener.off();
        };
    }, [chatId, userId, dbRef]);

    const setTyping = (isTyping) => {
        set(ref(dbRef, `chats/${chatId}/typing/${userId}`), isTyping);
    };

    return { messages, typingStatus, setTyping };
};

export default useRealtimeMessages;