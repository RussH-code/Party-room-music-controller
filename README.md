# Party-room-music-controller
A shared music playing system built with **django** and **React**

![](https://github.com/RussH-code/Party-room-music-controller/blob/main/demo.gif)

## Design

App Name | Tools | Function | Details
------|--------|---------
**Python Django** | Backend system | Implement basic web framework, handle URL routing and database
**Django Rest Framework** | Rest-API | Fetch calls from frontend and perform standard CRUD operations, also connects to Spotify API
**React JS** | Frontend system | Builds browsable user interface (UI) 

Each piece of functionality is implemented as a seperate *django* app.

App Name | Purpose
---------|---------
api | Handle standard CRUD operation on database models, such as the keeping track of the room and people in the room
spotify | Allows our app to connect to Spotify API and access the music
frontend | Implements the webpage design with React






