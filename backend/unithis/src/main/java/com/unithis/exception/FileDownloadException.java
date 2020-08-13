package com.unithis.exception;

public class FileDownloadException extends RuntimeException {

	private static final long serialVersionUID = -8982514340192601925L;

	public FileDownloadException(String message) {
		super(message);
	}

	public FileDownloadException(String message, Throwable cause) {
		super(message, cause);
	}
}
