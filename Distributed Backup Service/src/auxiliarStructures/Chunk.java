package auxiliarStructures;

public class Chunk {
	
	private FileToBackup file;
	private String serverId;		// who sent the file
	private int chunkNo;
	private int repDeg;
	
	
	
	public Chunk(FileToBackup file, int chunkNo, String filename, int repDeg, String serverId) {
        
		this.file = file;
		this.serverId = serverId;
		
        this.chunkNo = chunkNo;
        this.repDeg = repDeg;
        
    }	
	
	
	
}
