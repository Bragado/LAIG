package auxiliarStructures;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.Serializable;
import java.util.Hashtable;

import manager.ChunkManager;

public class Chunks implements Serializable {

	public final String path = "chunck/";
	
	
	/* <fileId, FileToBackup> FileToBackup has all the chunks of FileId*/
	Hashtable<String, FileToBackup> files = new Hashtable<>();
	
	
	public Chunks() {}
	
	public boolean newChunk(String fileID, int chunkNo, int repDeg, byte[] data, String serverID){
		
		return true;
	}
	
	public Hashtable<String, FileToBackup> getFiles() {
		return this.files;
	}
	
	public byte[] getChunkData(Chunk chunk) throws IOException {
		
		File chunkk = new File(path + chunk.getFilename() + ".ck");
		
		if(!chunkk.exists()) // TODO throw an exception
			throw new FileNotFoundException("Chunk does not exist");
		
		FileInputStream in = new FileInputStream(chunkk);
		
		byte[] data = null;
		byte[] tmp = new byte[ChunkManager.CHUNK_SIZE];
		
		try {
			data = new byte[in.read(tmp, 0, ChunkManager.CHUNK_SIZE)];
			System.arraycopy(tmp, 0, data, data.length, 0);
		
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		
		try {
			in.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			
			throw new IOException("Could not read the chunk file");
		}
		
		return data;
		
	}
	
	public byte[] data(String fileId, int chunkNo) throws IOException {
		
		Chunk chunk = files.get(fileId).getChunks().get(chunkNo);
		
		return getChunkData(chunk);
		
		
	}
	
	
	public long deleteFile();
	
	public void serialize();
	
	public void deserialize();
	
	
}
