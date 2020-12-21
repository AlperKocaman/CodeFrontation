package tr.com.obss.codefrontation.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tr.com.obss.codefrontation.dto.RoleDTO;
import tr.com.obss.codefrontation.mapper.RoleMapper;
import tr.com.obss.codefrontation.repository.RoleRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoleService {
	
	private RoleMapper roleMapper;
	private RoleRepository roleRepository;
	
	public List<RoleDTO> getAllRoles(){
		if(true) {
			List<RoleDTO> list = new ArrayList<RoleDTO>();
			RoleDTO r1 =new RoleDTO();
			RoleDTO r2 = new RoleDTO();
			r1.setId(UUID.randomUUID());
			r1.setName("Admin");
			r2.setId(UUID.randomUUID());
			r2.setName("User");
			list.add(r1);
			list.add(r2);
			return list;
		}
		return roleMapper.toDTOList(roleRepository.findAll());
	}
	
}
