export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  iconLink?: string;
  createdTime?: string;
  size?: string;
}

/**
 * List files from user's Google Drive
 */
export async function listDriveFiles(accessToken: string): Promise<DriveFile[]> {
  const url = 'https://www.googleapis.com/drive/v3/files?pageSize=30&fields=files(id,name,mimeType,webViewLink,iconLink,createdTime,size)&orderBy=createdTime%20desc';
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to list Google Drive files: ${response.statusText} (${errText})`);
  }

  const data = await response.json();
  return data.files || [];
}

/**
 * Upload a text or JSON marksheet backup file to Google Drive
 */
export async function uploadFileToDrive(
  accessToken: string,
  fileName: string,
  mimeType: string,
  content: string | Blob
): Promise<DriveFile> {
  const metadata = {
    name: fileName,
    mimeType: mimeType,
  };

  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  );

  const fileBlob = typeof content === 'string' ? new Blob([content], { type: mimeType }) : content;
  form.append('file', fileBlob);

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to upload file to Google Drive: ${errText}`);
  }

  return await response.json();
}

/**
 * Delete a file from Google Drive
 */
export async function deleteDriveFile(accessToken: string, fileId: string): Promise<void> {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to delete file from Google Drive: ${errText}`);
  }
}
