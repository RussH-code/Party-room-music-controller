# Party-room-music-controller
A shared music playing system built with **django** and **React**

![](https://github.com/RussH-code/Party-room-music-controller/blob/main/demo.gif)

## Design

Tools | Function | Details
------|--------|---------
**Python Django** | Backend system | Implement basic web framework, handle URL routing and database
**Django Rest Framework** | Rest-API | Fetch calls from frontend and perform standard CRUD operations, also connects to Spotify API
**React JS** | Frontend system | Builds browsable user interface (UI) 

Each piece of functionality is implemented as a seperate *django* app.

App Name | Purpose
---------|---------
**api** | Handle standard CRUD operation on database models, such as the keeping track of the room and people in the room
**spotify** | Allows our app to connect to Spotify API and access the music
**frontend** | Implements the webpage design with React

## Spotify API

![]()

To access the Spotify API, we use the following steps.
1. Application requests for authorization; the user logs in and authorizes access
2. Application requests refresh and access tokens; Spotify returns access and refresh tokens
3. Use the access token to access the Spotify Web API; Spotify returns requested data such as music library. This also gives control to user to pause/skip songs
4. Access token expires every 1 hour. So we need to requests a refreshed access token; Spotify returns a new access token to your app

*Note: Only premium users can access controls (play/pause/skip) through API. Regular users won't be able to enjoy these functions.*

For detailed information, check out the documentation on <a href="https://developer.spotify.com/documentation/general/guides/authorization-guide/">Spotify API</a>

---
References: Tech with Tim - Django & React - <a href="https://www.youtube.com/playlist?list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j">Full Stack Web App Tutorial</a>


