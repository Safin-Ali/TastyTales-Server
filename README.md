# TastyTales - Backend

## Introduction

This is the backend service for TastyTales, using MongoDB and Express.js. It supports user authentication via Firebase, manages recipes and virtual coins, and secures endpoints with JWT tokens. This backend interacts with the front-end to deliver a comprehensive recipe sharing experience.

## Features

### Authentication

- **Google Login**: Uses Firebase for user authentication through Google accounts.
- **User Initialization**: New users are stored in MongoDB with a starting balance of 50 coins.

### User Schema

```typescript
{
displayName: string,
photoURL: string,
email: string,
reacts: string[],
coin: number
}
```

### Recipe Operations

- **Add Recipe**: Authenticated users can submit new recipes with images and YouTube video links.
- **View Recipes**: Endpoints to list recipes and fetch detailed recipe data.
- **Recipe Schema**:
```typescript
{
recipeName: string,
recipeCreator: string,
purchased_by: string[],
reacts: number,
watchCount: number,
creatorEmail: string,
recipeImage: string,
recipeDetails: string,
embeddedYoutubeUrl: string,
country: string,
category: string
}
```

# Environment Variables
```yaml
MONGODB_URI=<your-mongodb-uri>
FIREBASE_API_KEY=<your-firebase-api-key>
JWT_SECRET=<your-jwt-secret>
```
