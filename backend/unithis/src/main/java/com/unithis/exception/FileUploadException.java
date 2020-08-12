package com.unithis.exception;

public class FileUploadException extends RuntimeException {

	private static final long serialVersionUID = -9090679952044237593L;

	public FileUploadException(String message) {
		super(message);
	}

	public FileUploadException(String message, Throwable cause) {
		super(message, cause);
	}
}