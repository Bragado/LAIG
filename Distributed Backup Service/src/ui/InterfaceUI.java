package ui;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface InterfaceUI extends Remote {
	
	String Backup(String[] args) throws RemoteException;
	String Restore(String[] args) throws RemoteException;
	String Delete(String[] args) throws RemoteException;
	String Reclaim(String[] args) throws RemoteException;
	String State() throws RemoteException;
	
}
