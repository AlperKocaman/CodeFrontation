package tr.com.obss.codefrontation.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import tr.com.obss.codefrontation.security.models.Credentials;
import tr.com.obss.codefrontation.security.models.SecurityProperties;
import tr.com.obss.codefrontation.security.models.User;
import tr.com.obss.codefrontation.utils.CookieUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Slf4j
public class SecurityFilter extends OncePerRequestFilter {

	@Autowired
	SecurityService securityService;

	@Autowired
	SecurityProperties restSecProps;

	@Autowired
	CookieUtils cookieUtils;

	@Autowired
	SecurityProperties securityProps;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		verifyToken(request);
		filterChain.doFilter(request, response);
	}

	private void verifyToken(HttpServletRequest request) {
		String sessionCookieValue = null;
		FirebaseToken decodedToken = null;
		Credentials.CredentialType type = null;
		boolean strictServerSessionEnabled = securityProps.getFirebaseProps().isEnableStrictServerSession();
		Cookie sessionCookie = cookieUtils.getCookie("session");
		String token = securityService.getBearerToken(request);
		try {
			if (sessionCookie != null) {
				sessionCookieValue = sessionCookie.getValue();
				decodedToken = FirebaseAuth.getInstance().verifySessionCookie(sessionCookieValue,
						securityProps.getFirebaseProps().isEnableCheckSessionRevoked());
				type = Credentials.CredentialType.SESSION;
			} else if (!strictServerSessionEnabled) {
				if (token != null && !token.equalsIgnoreCase("undefined")) {
					decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
					type = Credentials.CredentialType.ID_TOKEN;
				}
			}
		} catch (FirebaseAuthException e) {
			e.printStackTrace();
			log.error("Firebase Exception:: ", e.getLocalizedMessage());
		}
		User user = firebaseTokenToUserDto(decodedToken);
		if (user != null) {
			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user,
					new Credentials(type, decodedToken, token, sessionCookieValue), null);
			authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
	}

	private User firebaseTokenToUserDto(FirebaseToken decodedToken) {
		User user = null;
		if (decodedToken != null) {
			user = new User();
			user.setUid(decodedToken.getUid());
			user.setName(decodedToken.getName());
			user.setEmail(decodedToken.getEmail());
			user.setPicture(decodedToken.getPicture());
			user.setIssuer(decodedToken.getIssuer());
			user.setEmailVerified(decodedToken.isEmailVerified());
		}
		return user;
	}

}
