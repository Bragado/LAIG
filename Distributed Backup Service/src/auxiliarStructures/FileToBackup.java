package auxiliarStructures;

import java.util.Hashtable;

public class FileToBackup {
	
	private String id;
	private Hashtable<Integer, Chunk> chunks = new Hashtable<>();
	
	public static enum State  {DELETED, NOTDELETED, ALREADYBACKEDUP, NOTBACKEDUP};
	
	private State del = State.NOTDELETED;
	private State back = State.NOTBACKEDUP;
	
	
	public FileToBackup(String id) {
		this.id = id;
		
	}
	
	public Hashtable<Integer, Chunk> getChunks() {
		return chunks;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public State getBack() {
		return back;
	}
	
	public State getDel() {
		return del;
	}
	
	public String getId() {
		return id;
	}
	
	public void setBack(State back) {
		this.back = back;
	}
	
	public void setChunks(Hashtable<Integer, Chunk> chunks) {
		this.chunks = chunks;
	}
	
	public void setDel(State del) {
		this.del = del;
	}
	
	
	
	
}
