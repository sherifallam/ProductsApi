package com.productsapi.productsrestinterface.presentation;


import com.productsapi.commons.application.ApplicationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.hateoas.VndErrors;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.Optional;

@ControllerAdvice
public class ControllerValidationHandler {

    private final MediaType vndErrorMediaType = MediaType.parseMediaType("application/vnd.error+json");

    @ExceptionHandler(ConstraintViolationException.class)
    ResponseEntity<VndErrors> handleConstraintViolationException(ConstraintViolationException e) {
        this.log(e);
        String violationMesage = "";
        for (ConstraintViolation<?> violation : e.getConstraintViolations()) {
            violationMesage += violation.getMessage();
        }
        return error(new ApplicationException(violationMesage), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TransactionSystemException.class)
    ResponseEntity<VndErrors> handleTransactionSystemException(TransactionSystemException e) throws Throwable {
        if (e.getRootCause() instanceof ConstraintViolationException) {
            return handleConstraintViolationException((ConstraintViolationException) e.getRootCause());
        }
        this.log(e);
        return error(new ApplicationException(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    ResponseEntity<VndErrors> handleDataIntegrityViolationException(DataIntegrityViolationException e) {
        this.log(e);
        return error(new ApplicationException("Unable to complete the requested process due to a database constraint."), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<VndErrors> handleDataIntegrityViolationException(Exception e) {
        this.log(e);
        return error(new ApplicationException("Something went wrong with your request. Please contact an administrator or your local support team."), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private <E extends Exception> ResponseEntity<VndErrors> error(E e, HttpStatus httpStatus) {
        String msg = Optional.of(e.getMessage()).orElse(e.getClass().getSimpleName());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(this.vndErrorMediaType);
        return new ResponseEntity<>(new VndErrors("-", msg), httpHeaders, httpStatus);
    }

    /**
     * A dummy implementation used to log exceptions to the terminal. Should be replaced in production by a real logging framework such as log4j.
     * @param e
     */
    private void log(Exception e) {
       e.printStackTrace();
    }

}