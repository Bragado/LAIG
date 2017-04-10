package protocols;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import auxiliarStructures.Chunk;
import auxiliarStructures.FileToBackup;
import manager.ChunkManager;
import manager.FileManager;
import peer.Peer;

public class Backup {
	
	public static boolean backup(String filename, int repDeg) throws FileNotFoundException{
		
		/* Creation of the backup file */
		File file = new File(filename);
		if(!file.exists())
			throw new FileNotFoundException();
		
		String fileId = FileManager.computeFileId(filename);
	
		FileToBackup backup = new FileToBackup(fileId);
		Peer.peer.chunks.getFiles().put(fileId, backup);
		
		//TODO save
		
		
		/* Splits the file into chunks */
		int CHUNK_SIZE = ChunkManager.CHUNK_SIZE;
		
		int chunksSize = (int)Math.ceil((double)file.length()/CHUNK_SIZE);
		
		FileInputStream in = new FileInputStream(file);
		
		
		
		if(file.length() != 0) {
			
		
				try {
					if(file.length() != 0) {
						
						for(int i = 0; i < chunksSize; i++) {
								
							byte[] tmp = new byte[CHUNK_SIZE];
							
							byte[] chunk_data = new byte[in.read(tmp, 0, CHUNK_SIZE)];
					
							System.arraycopy(tmp, 0, chunk_data, 0, chunk_data.length);
							
							Chunk chunk = createChunk(backup, i, repDeg, chunk_data);
						}
						
					}
				
				} catch (IOException e) {
					// TODO Auto-generated catch block
					try {
						in.close();
					} catch (IOException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
					e.printStackTrace();
				}
				
		
		
		}
		
		try {
			in.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}
	
	public static Chunk createChunk(FileToBackup file, int chunkNo, int repDeg, byte[] data) {
		Chunk chunk = new Chunk(file, chunkNo, null, repDeg, Peer.peer.getID());
		//TODO add stages to chunk
		file.getChunks().put(chunkNo, chunk);
		return chunk;
	}
	
	
	public static boolean sendChunk(Chunk chunk, byte[] data) {
		return true;
	}
	
	public static boolean reSendChunk(Chunk chunk) {
		
		try {		
			
			return sendChunk(chunk, 
					Peer.peer.chunks.data(chunk.getFile().getId(), chunk.getChunkNo())
					);
					
		
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
		
		
		return false;
	}
	
	
}
