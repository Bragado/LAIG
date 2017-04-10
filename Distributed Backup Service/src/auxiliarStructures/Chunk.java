package auxiliarStructures;

public class Chunk {
	
	private FileToBackup file;
	private String serverId;		// who sent the file
	private int chunkNo;
	private int repDeg;
	private String filename;
	
	private final int online = 0;
	
	
	
	public Chunk(FileToBackup file, int chunkNo, String filename, int repDeg, String serverId) {
        this.filename = filename;
		this.file = file;
		this.serverId = serverId;
		
        this.chunkNo = chunkNo;
        this.repDeg = repDeg;
        
    }	
	
	public int getChunkNo() {
		return chunkNo;
	}
	
	public String getServerId() {
		return serverId;
	}
	
	public String getFilename() {
		return filename;
	}
	
	public FileToBackup getFile() {
		return file;
	}
	
}
