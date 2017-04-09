package ui;

import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class TestApp {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
			
		switch(args.length) {
		case 2:
			if(args[1].equals("STATE"))
			break;
		case 3:
			break;
		case 4:
			if(args[1].equals("BACKUP"))
			break;
		default:
			System.out.println("Number of arguments is incorrect");
			break;
			
		
		}
		
		 
		try {
			Registry registry = LocateRegistry.getRegistry();
			InterfaceUI ui = (InterfaceUI)registry.lookup(args[0]);
			String message = "";
			
			switch (args[1]){
			case "BACKUP":
				message = ui.Backup(args);
				break;
			case "RESTORE":
				message = ui.Restore(args);
				break;
			case "DELETE":
				message = ui.Delete(args);
				break;
			case "RECLAIM":
				message = ui.State();
				break;
			case "STATE":
				break;
				default:
					System.out.println("Protocol is incorrect\nOptions are: <BACKUP> <RESTORE> <DELETE> <RECLAIM> <STATE>");
				break;
			
			}
			
			System.out.println("Response:\n" + message);
			
		}catch (RemoteException e){
			e.printStackTrace();
		}catch(NotBoundException e){
			e.printStackTrace();
		}
		
		
		
	}

}
