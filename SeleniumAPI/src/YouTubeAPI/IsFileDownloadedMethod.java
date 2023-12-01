package org.example;

import java.io.File;

public class IsFileDownloadedMethod {
    public static boolean isFileDownloaded(String downloadPath, String fileName) {
        File dir = new File(downloadPath);
        File[] dirItems = dir.listFiles();

        for (int i = 0; i < dirItems.length; i++) {
            if (dirItems[i].getName().equals(fileName)) {
                // delete file once found
                dirItems[i].delete();
                return true;
            }
        }
        return false;
    }
}
