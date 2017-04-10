package peer;

import java.nio.file.Files;

import auxiliarStructures.Chunks;
import auxiliarStructures.*;
import channels.MC_Channel;
import channels.MDB_Channel;
import channels.MDR_Channel;
import ui.UIListenner;

public class Peer {
	
	private UIListenner ui;
	
	
	public static Peer peer;
	public static final int CHUNK_SIZE = 64000;
	
	
	
	public static final String MC = "";
	public static final int MC_PORT = 1591;
	
	public static final String MDB = "";
	public static final int MDB_PORT = 1592;
	
	public static final String MDR = "";
	public static final int MDR_PORT = 1593;
	
	
	private MC_Channel mc_channel;
	private MDB_Channel mdb_channel;
	private MDR_Channel mdr_channel;
	public Chunks chunks = new Chunks();
	public auxiliarStructures.Files files = new auxiliarStructures.Files();


	private String ID;


	private String version;
	
	
	public Peer(String[] args) {
		/*
		 * args[0] -> version
		 * args[1] -> server id
		 * args[2] -> service access point
		 * args[3] -> MC address
		 * args[4] -> MC Port
		 * args[5] -> MDB address
		 * args[6] -> MDB port
		 * args[7] -> MDR address
		 * args[8] -> MDR port
		 */
		this.ID = args[1];
		this.version = args[0];
		
		this.ui = new UIListenner(args[2]);
		this.mc_channel = new MC_Channel(args[3], Integer.parseInt(args[4]));
		this.mdb_channel = new MDB_Channel(args[5], Integer.parseInt(args[6]));
		this.mdr_channel = new MDR_Channel(args[7], Integer.parseInt(args[8]));
		
		new Thread(this.ui).start();
		new Thread(this.mc_channel).start();
		new Thread(this.mdb_channel).start();
		new Thread(this.mdr_channel).start();
		peer = this;
	}
	
	public static Peer getPeer() {
		return peer;
	}
	
	public static void main(String[] args) {
		
		Peer peer = new Peer(args);
		
		synchronized(peer){
			while(true){
				try {
					peer.wait();
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		
	}
	
	
	public String getID() {
		return this.ID;
	}
	
	public String getVersion() {
		return this.version;
	}
	
}
