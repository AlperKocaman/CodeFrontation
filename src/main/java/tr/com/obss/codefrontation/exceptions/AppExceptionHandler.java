package tr.com.obss.codefrontation.exceptions;

//import tr.com.obss.codefrontation.dto.ErrorDTO;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
//
//@Slf4j
//@ControllerAdvice
//public class AppExceptionHandler extends ResponseEntityExceptionHandler {

    //@ExceptionHandler(IllegalArgumentException.class)
    //public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException ex) {
    //    ErrorDTO error = new ErrorDTO();
    //    error.setErrorMessage(ex.getMessage());
    //    return new ResponseEntity<>(error, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    //}
    //@ExceptionHandler(InterruptedException.class)
    //public ResponseEntity<Object> handleInterruptedException(InterruptedException ex) {
    //    return new ResponseEntity<>(new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    //}
//
    //@ExceptionHandler(NullPointerException.class)
    //public ResponseEntity<Object> handleNullPointerException(NullPointerException ex) {
    //    ErrorDTO error = new ErrorDTO();
    //    error.setErrorMessage(ex.getMessage());
    //    return new ResponseEntity<>(new HttpHeaders(), HttpStatus.BAD_REQUEST);
    //}
//}
