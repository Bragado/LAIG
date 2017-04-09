package channels;

import java.io.IOException;
import java.net.InetAddress;
import java.net.MulticastSocket;
import java.net.UnknownHostException;
import java.util.Observable;

public abstract class Channel extends Observable {

	public final static String CRLF = "\r\n";
	
	protected MulticastSocket multicastSocket;
	protected InetAddress multicastAddress;
	protected int port;
	
	public InetAddress getMulticastAddress() {
		return multicastAddress;
	}
	
	public MulticastSocket getMulticastSocket() {
		return multicastSocket;
	}
	
	public int getPort() {
		return port;
	}
	
	public void setMulticastAddress(InetAddress multicastAddress) {
		this.multicastAddress = multicastAddress;
	}
	
	public void setMulticastSocket(MulticastSocket multicastSocket) {
		this.multicastSocket = multicastSocket;
	}
	
	public void setPort(int port) {
		this.port = port;
	}
	
	public Channel(String address, int port) {
		// TODO Auto-generated constructor stub
		try {
			this.multicastAddress = InetAddress.getByName(address);
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		this.port = port;
		
		// creates multicastSocket and joins the group
		try {
			this.multicastSocket = new MulticastSocket(port);
			this.multicastSocket.joinGroup(multicastAddress);
			this.multicastSocket.setTimeToLive(1);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		
	}
	
	protected abstract void handler(String header, byte[] body) throws Channel_Exception;
	
	
}
