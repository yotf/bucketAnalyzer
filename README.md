# Vite + React + Typescript + Hono App for processing and managing files

The File Processing Dashboard is a React-based application for processing files stored in buckets. Users can create buckets, add files, and process them to extract information such as content hashes, classifications (e.g., malware vs. goodware), and more. The processed information is stored locally and displayed in a user-friendly dashboard.

## Technologies used

- Frontend:

  - React
  - React Query
  - Tailwind CSS
  - TypeScript
  - Axios
  - Toast Notifications

- Backend (added in order to be able to read files from the filesystem)
  - Hono
  - fs-extra (File System Operations)

## Prerequisites

Make sure you have installed:

- Node.js (v14+)
- npm or Yarn

## Setup instructions

### 1. Clone the respository

```
git clone https://github.com/yotf/bucketAnalyzer.git
cd bucketAnalyzer
```

### 2. Install dependencies

#### Frontend

```
npm install
```

#### Backend

```
cd backend
npm install
```

## Running the application

The library concurrently is used, so both backend and frontend can be started from the main folder (bucketAnalyzer) with this command:

```
npm run dev
```

The backend server should start on `http://localhost:3001`
The frontend should be accessible on `http://localhost:5173`

## Testing the frontend

Once the application runs it should take you to the main and only page of the app, that has two sections:


### 1. File Processing
![Screenshot 2024-08-28 133510](https://github.com/user-attachments/assets/80bb4345-64a1-498e-84ac-8ef564655ddd)

This section is used for selecting which files from the selected bucket the user wants to process.
If the user doesn't select any file from the bucket - all files will be processed.
Processing is initiated by pressing the "Process Files" button. A notification appears upon success or failure.

The info of each file is stored in local storage.
Clicking the DASHBOARD button opens a modal that displays
all the info from the processed files.

### 2.Bucket and File Creation

This section is used for creating new buckets and files in
existing buckets.

- The buttons are disabled if the fields are not valid
- When the ADD button is clicked new files/buckets are created via the back-end, and success or failure (if bucket/file with that name already exists) notification is shown.
