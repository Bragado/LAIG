package ui;

import peer.Peer;

import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class UIListenner implements InterfaceUI, Runnable{

	public final int port = 1099; // default value
	
	private String id;
	
	public UIListenner(String id) {
		this.id = id;
	}
	
	@Override
	public void run() {
		// TODO Auto-generated method stub
			 /* not sure if it's going to work */
			
			try {
			LocateRegistry.createRegistry(port);
			}catch(RemoteException e){
				System.out.println("Another peer is running in this machine");
			}
			
			InterfaceUI rmi;
			try {
				rmi = (InterfaceUI)UnicastRemoteObject.exportObject(this, 0);
				Registry registry = LocateRegistry.getRegistry();
				registry.rebind(this.id, rmi);
			
			
			} catch (RemoteException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		
		
	}

	@Override
	public String Backup(String[] args) throws RemoteException {
		// TODO Auto-generated method stub
		System.out.println("Trying to backup with args: " + args[2] + " " + args[3]  );
		
		return null;
	}

	@Override
	public String Restore(String[] args) throws RemoteException {
		// TODO Auto-generated method stub
		System.out.println("Trying to Restore with args: " + args[2]);
		return null;
	}

	@Override
	public String Delete(String[] args) throws RemoteException {
		// TODO Auto-generated method stub
		System.out.println("Trying to Delete with args: " + args[2]);
		return null;
	}

	@Override
	public String Reclaim(String[] args) throws RemoteException {
		// TODO Auto-generated method stub
		System.out.println("Trying to Reclaim with args: " + args[2]);
		return null;
	}

	@Override
	public String State() throws RemoteException {
		// TODO Auto-generated method stub
		System.out.println("Trying to get State");
		return null;
	}
		
}
