﻿# Live-Chat-App
 The Private Chat Room feature allows users to create temporary, invitation-only chat rooms within the MERN stack application. This functionality enables users to have private conversations with specific individuals or groups, ensuring that only invited participants can access the chat room.

Key Features:

1. Chat Room Creation:
Users can create a new chat room by providing a room name.
Upon creation, a unique room ID is generated and associated with the chat room.
The chat room is temporary, meaning it exists only for the duration of the conversation or until all users leave the room.

2. User Invitations:
The chat room creator can invite other users by entering their usernames or email addresses.
Invited users receive a notification or link that grants them access to the private chat room.

4. Access Control:
Only invited users can join the chat room.
A room access key or token is generated and shared with invited users to ensure privacy.
The room creator can manage participants, including adding or removing users from the chat room.

6. Real-Time Communication:
Users within the chat room can send and receive messages in real-time using Socket.IO for seamless communication.
Messages are visible only to the participants of the private chat room.

8. Temporary Nature:
The chat room is automatically deleted from the database when all users leave the room.
Users can manually close the chat room, which removes it from the database.

10. Security and Privacy:
All communication within the chat room is encrypted to ensure user privacy.
The chat room data is not stored permanently, reinforcing the temporary nature of the private chat.

Technical Implementation:
Frontend: Built using React, with components for creating chat rooms, inviting users, and real-time messaging.

Backend: Implemented using Node.js and Express.js, with MongoDB for storing temporary chat room data.

Real-Time Communication: Socket.IO is used to manage real-time messaging and event handling.

Authentication & Authorization: JWT is used to authenticate users and manage access to private chat rooms.
