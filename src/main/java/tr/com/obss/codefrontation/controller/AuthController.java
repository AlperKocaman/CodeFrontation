package tr.com.obss.codefrontation.controller;

//import com.google.firebase.auth.SessionCookieOptions;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.google.firebase.auth.FirebaseAuth;
//import com.google.firebase.auth.FirebaseAuthException;
//import tr.com.obss.codefrontation.security.SecurityService;
//import tr.com.obss.codefrontation.security.models.Credentials;
//import tr.com.obss.codefrontation.security.models.SecurityProperties;
//import tr.com.obss.codefrontation.security.models.User;
//import tr.com.obss.codefrontation.utils.CookieUtils;
//
//import javax.servlet.http.HttpServletRequest;
//import java.util.concurrent.TimeUnit;
//
//@RestController
//public class AuthController {
//
//	@Autowired
//	SecurityService securityService;
//
//	@Autowired
//	CookieUtils cookieUtils;
//
//	@Autowired
//	SecurityProperties secProps;
//
//	@PostMapping("/me")
//	public User getUser() {
//		return securityService.getUser();
//	}
//
//	@GetMapping("/create/token")
//	public String getCustomToken() throws FirebaseAuthException {
//		return FirebaseAuth.getInstance().createCustomToken(String.valueOf(securityService.getUser().getUid()));
//	}
//
//	@PostMapping("/session/login")
//	public void sessionLogin(HttpServletRequest request) {
//		String idToken = securityService.getBearerToken(request);
//		int sessionExpiryDays = secProps.getFirebaseProps().getSessionExpiryInDays();
//		long expiresIn = TimeUnit.DAYS.toMillis(sessionExpiryDays);
//		SessionCookieOptions options = SessionCookieOptions.builder().setExpiresIn(expiresIn).build();
//		try {
//			String sessionCookieValue = FirebaseAuth.getInstance().createSessionCookie(idToken, options);
//			cookieUtils.setSecureCookie("session", sessionCookieValue,
//					sessionExpiryDays);
//			cookieUtils.setCookie("authenticated", Boolean.toString(true),
//					sessionExpiryDays);
//		} catch (FirebaseAuthException e) {
//			e.printStackTrace();
//		}
//	}
//
//	@PostMapping("/session/logout")
//	public void sessionLogout() {
//		if (securityService.getCredentials().getType() == Credentials.CredentialType.SESSION
//				&& secProps.getFirebaseProps().isEnableLogoutEverywhere()) {
//			try {
//				FirebaseAuth.getInstance().revokeRefreshTokens(securityService.getUser().getUid());
//			} catch (FirebaseAuthException e) {
//				e.printStackTrace();
//			}
//		}
//		cookieUtils.deleteSecureCookie("session");
//		cookieUtils.deleteCookie("authenticated");
//
//	}
//
//}