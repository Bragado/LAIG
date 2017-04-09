package manager;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.attribute.FileOwnerAttributeView;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;

public class FileManager {
	
	final public static char[] hexArray = "0123456789ABCDEF".toCharArray();
	
	public static String computeFileId(String filename){
		
		File file = new File(filename);
		
		// name
		String name = file.getName();
		
		// owner
		String owner = "";
		try {
			owner = Files.getFileAttributeView(Paths.get(file.getAbsolutePath()), FileOwnerAttributeView.class).getOwner().getName();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		// length
		long length = file.length();
		
		// date
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		simpleDateFormat.format(file.lastModified());
		String date = simpleDateFormat.toString();
		
		// metadata
		String metadata = name + date + owner + length;
		
		return encodeFileId(metadata);
		
		
	}
	
	
	
	public static String encodeFileId(String metadata) {
		
		MessageDigest digest;
		
		byte[] hash;
		char[] hexChars = null;
		try {
			// SHA256 - http://stackoverflow.com/questions/5531455/how-to-hash-some-string-with-sha256-in-java
			digest = MessageDigest.getInstance("SHA-256");
			hash = digest.digest(metadata.getBytes(StandardCharsets.UTF_8));
			
			// encode bytes to hexa -http://stackoverflow.com/questions/9655181/how-to-convert-a-byte-array-to-a-hex-string-in-java
			
			hexChars = new char[hash.length * 2];
		    for ( int j = 0; j < hash.length; j++ ) {
		        int v = hash[j] & 0xFF;
		        hexChars[j * 2] = hexArray[v >>> 4];
		        hexChars[j * 2 + 1] = hexArray[v & 0x0F];
		    }
			
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	    return new String(hexChars);
	}
	
	
	
	
}
