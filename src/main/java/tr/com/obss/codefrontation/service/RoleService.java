package tr.com.obss.codefrontation.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tr.com.obss.codefrontation.dto.RoleDTO;
import tr.com.obss.codefrontation.entity.Role;
import tr.com.obss.codefrontation.mapper.RoleMapper;
import tr.com.obss.codefrontation.repository.RoleRepository;

import javax.annotation.PostConstruct;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoleService {
	
	private final RoleMapper roleMapper;
	private final RoleRepository roleRepository;
	@PostConstruct
	public void initRoles(){
		if(roleRepository.findAll().isEmpty()) {
			Role role1 = new Role();
			role1.setId(UUID.randomUUID());
			role1.setName("Senior Developer");
			roleRepository.save(role1);
			Role role2 = new Role();
			role2.setId(UUID.randomUUID());
			role2.setName("Expert Developer");
			roleRepository.save(role2);
			Role role3 = new Role();
			role3.setId(UUID.randomUUID());
			role3.setName("Junior Developer");
			roleRepository.save(role3);
		}
	}


	public List<RoleDTO> getAllRoles(){
		return roleMapper.toDTOList(roleRepository.findAll());
	}
	
}
