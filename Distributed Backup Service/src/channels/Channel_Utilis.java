package channels;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Channel_Utilis {
	
	public static final String CRLF = "\r\n";
	
	public static BufferedReader getNewReader(byte[] message){
		ByteArrayInputStream baiStream = new ByteArrayInputStream(message);
		return new BufferedReader( new InputStreamReader(baiStream)); 
		
	}
	
	
	/**
	 * Given a header returns all the fields in a String
	 * @param message the header
	 * @return string header
	 */
	public static String parseHeader(byte[] message) throws Channel_Exception {
	
		BufferedReader bReader = getNewReader(message);
				
		String ret;
		
		try {
			ret = bReader.readLine();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			throw new Channel_Exception("Could not parse the message header", Channel_Exception.ExceptionType.MESSAGE);
		}
		
		
		return ret;
		
	}
	
	/**
	 *  Given a header returns all the fields split in a String Array
	 *  @param message the header
	 *  @return the string array with all fields
	 */
	
	public static String[] parseHeaderFields(byte[] message) throws Channel_Exception {
		
		String header = parseHeader(message);
		
		return header.split(" ");
	}
	
	
	public static byte[] parseBody(byte[] message, int size) throws Channel_Exception {
		
		
		
		String header = parseHeader(message);
		
		byte[] body = Arrays.copyOfRange(message, header.getBytes().length + CRLF.getBytes().length , size); // TODO need to test !!
		
		return body;
		
		
		
		
		
	}
	
	/**
	 * Checks if the fileId length is correct
	 * @fileID the fileID
	 * @return true if it's correct 
	 */
	
	public static boolean checkFileId(String fileId) {
		return fileId.length() == 64;
	}
	
	/**
	 * Checks if the chunck Number length is correct
	 * @chunckNo the chunck Number
	 * @return true if it's correct 
	 */
	public static boolean checkChunkNo(String chunckNo) {
		return chunckNo.length() <= 6;
	}
	
	/**
	 * Checks if the version Number is correct
	 * @version the version Number
	 * @return true if it's correct 
	 */
	public static boolean checkVersion(String version){
		return version.length() == 3 && version.charAt(0) >= '0' && version.charAt(0) <= '9' &&
				version.charAt(1) == '.' && version.charAt(2) >= '0' && version.charAt(2) <= '9';
	}
	
	/**
	 * Checks if the replication degree length is correct
	 * @repDeg the replication degree
	 * @return true if it's correct 
	 */
	public static boolean checkRepDeg(String repDeg) {
		return repDeg.length() == 1;
	}
	
	/**
	 *  Creates a new message
	 *  @param header the message header
	 *  @param body the message body/chunk
	 *  @return message
	 */
	
	public static byte[] computeMessage(String header, byte[] body) {
		byte[] byteHeader = header.getBytes();
		byte[] message = new byte[byteHeader.length + body.length];
		
		
		System.arraycopy(byteHeader, 0, message, 0, byteHeader.length);
		System.arraycopy(body, 0, message, byteHeader.length, body.length);
		
		return message;
	}
	
	
	/**
	 * Given the message fields, creates a new header
	 * @param params String array with all fields
	 * @return header
	 */
	public static String newHeader(String[] params) {
		String header = "";
		
		for(int i = 0; i < params.length; i++) {
			header += params[i];
			if(i != params.length - 1)
				header += " ";
		}
		
		header += CRLF + CRLF;
		return header;
	}
	
	
}
