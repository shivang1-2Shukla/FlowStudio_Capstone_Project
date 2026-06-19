# FlowStudio Capstone Project

FlowStudio is a personalized coding and creative workspace (Sandbox Pro) built on a full-stack Spring Boot and React architecture. 

This repository is split into:
*   `backEnd/` - Spring Boot (Java 17, Spring Data JPA, Hibernate, MySQL) REST API.
*   `frontEnd/` - React client-side environment.
*   `Documentation/` - Project requirement artifacts (BRD, SRS PDFs).

---

## 1. Project Directory Layout

```text
FlowStudio_Capstone_Project/
 ├─ backEnd/
 │   ├─ pom.xml
 │   └─ src/main/java/com/myanatomy/sandboxpro/
 │       ├─ config/
 │       │   └─ PasswordConfig.java
 │       ├─ controller/
 │       │   ├─ AuthController.java
 │       │   ├─ UserController.java
 │       │   └─ ProfileController.java
 │       ├─ dto/
 │       │   ├─ request/
 │       │   │   ├─ LoginRequest.java
 │       │   │   ├─ RegisterRequest.java
 │       │   │   ├─ UpdateUserRequest.java
 │       │   │   └─ UpdateProfileRequest.java
 │       │   └─ response/
 │       │       ├─ UserResponse.java
 │       │       ├─ UserProfileResponse.java
 │       │       └─ AuthResponse.java
 │       ├─ entity/
 │       │   ├─ Role.java
 │       │   ├─ User.java
 │       │   └─ UserProfile.java
 │       ├─ repository/
 │       │   ├─ UserRepository.java
 │       │   └─ UserProfileRepository.java
 │       └─ service/
 │           └─ UserService.java
 ├─ frontEnd/
 │   ├─ package.json
 │   └─ src/
 │       ├─ App.js
 │       └─ index.js
 └─ README.md
```

---

## 2. Today's Refactoring & Architectural History

We executed a major refactoring of the backend API layer to resolve severe security vulnerabilities, package structural layout problems, and violations of the **Separation of Concerns** principle.

### Summary of Differences (Before vs. After)

| Aspect | Before Refactoring (Old Code) | After Refactoring (New Code) |
| :--- | :--- | :--- |
| **User Schema** | Monolithic `User` entity containing account details, bio, skills, location. | Separated into `User` (account fields) and a secondary table `UserProfile` (`@OneToOne`). |
| **Package Layout** | Entities located in `com.myanatomy.sandboxpro.model` package. | Renamed to `com.myanatomy.sandboxpro.entity` package for standard Spring conventions. |
| **REST Data Flow** | Exposed and returned database Entity objects directly to API clients. | Abstracted behind custom Request/Response Data Transfer Objects (DTOs). |
| **Controller Layout** | Single monolithic `UserController` handling register, login, profile view, updates. | Separated into `AuthController`, `UserController`, and `ProfileController`. |

---

## 3. Why the Old Architecture Was Bad

1.  **High Security Risks:** Because database `@Entity` objects were serialized directly into JSON responses, any request to fetch user profiles could accidentally expose the hashed passwords stored in the database.
2.  **Over-Posting (Mass Assignment):** API clients could update protected fields (like a user's role or user ID) simply by sending extra fields in their update requests, since the controller accepted the DB entity class as a parameter.
3.  **Circular Dependency Crashes:** Bidirectional relationships in entities caused infinite recursion loops during JSON serialization.
4.  **Tightly Coupled REST Contracts:** Any change to the database table fields immediately forced a change in the frontend schema, creating brittle contracts.
5.  **Controller Bloat:** The `UserController` did everything from registration checking to profile updates, violating Single Responsibility principles.

---

## 4. The Refactored Architecture & Design Patterns

### A. Separation of Entities (`User` and `UserProfile`)
To support users having complex workspaces, credentials and profiles are separated.
*   **[User.java](file:///c:/users/ansh%20gupta/FlowStudio_Capstone_Project/backEnd/src/main/java/com/myanatomy/sandboxpro/entity/User.java):** Only stores core credentials and security roles (`USER`, `ADMIN`).
*   **[UserProfile.java](file:///c:/users/ansh%20gupta/FlowStudio_Capstone_Project/backEnd/src/main/java/com/myanatomy/sandboxpro/entity/UserProfile.java):** Unidirectional `@OneToOne` reference back to `User`. Contains creative field attributes, bios, locations, availability status, and profile pictures.

### B. Clean DTO Architecture
No JPA entities leave the Controller. We perform explicit conversion before serialization.
```text
Client JSON Request ──➔ [Request DTO] ──➔ Controller ──➔ Service ──➔ JPA Entity
                                                                       │
Client JSON Response ↞── [Response DTO] ↞──────────────────────────────┘
```

*   **Request DTOs:** Force inputs to only include editable fields. Uses `@Valid` validations.
*   **Response DTOs:** Define exactly what gets returned (e.g. `UserResponse` completely excludes the password). Returns flat relational values (`userId` instead of nested objects) to prevent circular dependency serialization loops.

### C. Split Controllers (Separation of Concerns)
*   **[AuthController.java](file:///c:/users/ansh%20gupta/FlowStudio_Capstone_Project/backEnd/src/main/java/com/myanatomy/sandboxpro/controller/AuthController.java):** Manages `/api/auth/register` and `/api/auth/login`.
*   **[UserController.java](file:///c:/users/ansh%20gupta/FlowStudio_Capstone_Project/backEnd/src/main/java/com/myanatomy/sandboxpro/controller/UserController.java):** Manages basic user queries and name/role edits at `/api/users/*`.
*   **[ProfileController.java](file:///c:/users/ansh%20gupta/FlowStudio_Capstone_Project/backEnd/src/main/java/com/myanatomy/sandboxpro/controller/ProfileController.java):** Manages user creative and personal profiles at `/api/profiles/*`.

---

## 5. API Reference & JSON Examples

### 1. Register User
*   **Endpoint:** `POST /api/auth/register`
*   **Request Payload (`RegisterRequest`):**
    ```json
    {
      "name": "Jane Doe",
      "email": "jane@flowstudio.com",
      "password": "mySecurePassword123",
      "role": "USER"
    }
    ```
*   **Response Payload (`UserResponse`):**
    ```json
    {
      "id": 1,
      "name": "Jane Doe",
      "email": "jane@flowstudio.com",
      "role": "USER"
    }
    ```
    *(Note: The hashed password and user profile database indices are completely hidden from the user).*

### 2. Login User
*   **Endpoint:** `POST /api/auth/login`
*   **Request Payload (`LoginRequest`):**
    ```json
    {
      "email": "jane@flowstudio.com",
      "password": "mySecurePassword123"
    }
    ```
*   **Response Payload (`AuthResponse`):**
    ```json
    {
      "token": null,
      "tokenType": "Bearer",
      "user": {
        "id": 1,
        "name": "Jane Doe",
        "email": "jane@flowstudio.com",
        "role": "USER"
      }
    }
    ```

### 3. Fetch User Profile
*   **Endpoint:** `GET /api/profiles/{userId}`
*   **Response Payload (`UserProfileResponse`):**
    ```json
    {
      "id": 1,
      "userId": 1,
      "bio": "I am a Full Stack Developer",
      "skills": "Java, Spring Boot, React",
      "location": "New York, USA",
      "creativeField": "Web Development",
      "availability": "Full Time",
      "profilePicture": "https://flowstudio.com/avatar/jane.png"
    }
    ```

### 4. Update Profile
*   **Endpoint:** `PUT /api/profiles/{userId}`
*   **Request Payload (`UpdateProfileRequest`):**
    ```json
    {
      "bio": "Creative Designer & Dev",
      "skills": "Figma, React, Spring",
      "location": "San Francisco, USA",
      "creativeField": "Design & Dev",
      "availability": "Part Time",
      "profilePicture": "https://flowstudio.com/avatar/jane-new.png"
    }
    ```

---

## 6. How to Build & Run locally

### Requirements:
1.  **JDK 17**
2.  **Maven**
3.  **MySQL Database** named `flowstudio` running on port 3306.

### Steps:
1.  Verify database credentials in `backEnd/src/main/resources/application.properties`.
2.  Navigate to the `backEnd/` directory and compile:
    ```bash
    mvn clean compile
    ```
3.  Run the Spring Boot application:
    ```bash
    mvn spring-boot:run
    ```
4.  Navigate to the `frontEnd/` directory, install dependencies and start the React dev server:
    ```bash
    npm install
    npm start
    ```