import { NextResponse } from 'next/server';
import { verifyIdToken } from '@/lib/firebase';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const decodedToken = await verifyIdToken(token);
        const userId = decodedToken.uid;

        // Example: Fetch data based on userId
        const data = await prisma.post.findMany({
            where: { userId },
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }
}

export async function POST(request) {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const decodedToken = await verifyIdToken(token);
        const userId = decodedToken.uid;
        const body = await request.json();

        // Example: Create a new post
        const newPost = await prisma.post.create({
            data: {
                userId,
                content: body.content,
                // Add other fields as necessary
            },
        });

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token or data' }, { status: 403 });
    }
}