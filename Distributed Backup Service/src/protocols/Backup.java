package protocols;

import java.io.File;
import java.io.FileNotFoundException;

public class Backup {
	
	public static boolean backup(String filename, int replicationDegree) throws FileNotFoundException{
		
		File file = new File(filename);
		if(!file.exists())
			throw new FileNotFoundException();
		
	
		
		
		
		return true;
	}
	
	
}
