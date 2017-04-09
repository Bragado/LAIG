package channels;

public class MDR_Channel extends Channel implements Runnable{

	public MDR_Channel(String address, int port) {
		super(address, port);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
		System.out.println("MDR Channel Created");
	}

	@Override
	protected void handler(String header, byte[] body) {
		// TODO Auto-generated method stub
		
	}

}
