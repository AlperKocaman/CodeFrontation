package tr.com.obss.codefrontation.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tr.com.obss.codefrontation.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, UUID>{

}
