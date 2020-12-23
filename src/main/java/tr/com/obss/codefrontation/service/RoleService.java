package tr.com.obss.codefrontation.service;

import java.util.List;

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
	
	private final RoleMapper roleMapper;
	private final RoleRepository roleRepository;
	
	public List<RoleDTO> getAllRoles(){
		return roleMapper.toDTOList(roleRepository.findAll());
	}
	
}
