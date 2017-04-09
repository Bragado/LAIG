package channels;

public class Channel_Exception extends Exception {
	
	public static enum ExceptionType {MESSAGE, CHANNEL};
	
	public ExceptionType exceptionType;
	
	
	public Channel_Exception(String message, ExceptionType exceptionType) {
		super(message);
		this.exceptionType = exceptionType;
	}
	
	@Override
	public String getMessage() {
		String ret = "";
		switch(this.exceptionType) {
		case MESSAGE:
			ret = "MESSAGE EXCEPTION: " + super.getMessage();
			break;
		case CHANNEL:
			ret = "CHANNEL EXCEPTION: " + super.getMessage();
			break;
			default:
				ret = "UNKNOW EXCEPTION THROWN: " + super.getMessage();
				break;
		}
		return ret;
	}
	
	
}
