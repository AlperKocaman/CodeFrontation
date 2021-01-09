package tr.com.obss.codefrontation.security;

//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.context.SecurityContext;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Service;
//import org.springframework.util.StringUtils;
//import tr.com.obss.codefrontation.security.models.Credentials;
//import tr.com.obss.codefrontation.security.models.SecurityProperties;
//import tr.com.obss.codefrontation.security.models.User;
//import tr.com.obss.codefrontation.utils.CookieUtils;
//
//import javax.servlet.http.HttpServletRequest;

//@Service
//public class SecurityService {
//
//	@Autowired
//	HttpServletRequest httpServletRequest;
//
//	@Autowired
//	CookieUtils cookieUtils;
//
//	@Autowired
//	SecurityProperties securityProps;
//
//	public User getUser() {
//		User userPrincipal = null;
//		SecurityContext securityContext = SecurityContextHolder.getContext();
//		Object principal = securityContext.getAuthentication().getPrincipal();
//		if (principal instanceof User) {
//			userPrincipal = ((User) principal);
//		}
//		return userPrincipal;
//	}
//
//	public Credentials getCredentials() {
//		SecurityContext securityContext = SecurityContextHolder.getContext();
//		return (Credentials) securityContext.getAuthentication().getCredentials();
//	}
//
//	public boolean isPublic() {
//		return securityProps.getAllowedPublicApis().contains(httpServletRequest.getRequestURI());
//	}
//
//	public String getBearerToken(HttpServletRequest request) {
//		String bearerToken = null;
//		String authorization = request.getHeader("Authorization");
//		if (StringUtils.hasText(authorization) && authorization.startsWith("Bearer ")) {
//			bearerToken = authorization.substring(7, authorization.length());
//		}
//		return bearerToken;
//	}
//
//}
