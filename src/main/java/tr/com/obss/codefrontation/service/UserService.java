package tr.com.obss.codefrontation.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.com.obss.codefrontation.dto.UserDTO;
import tr.com.obss.codefrontation.entity.User;
import tr.com.obss.codefrontation.mapper.Mapper;
import tr.com.obss.codefrontation.repository.UserRepository;

import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final Mapper mapper;
    private final UserRepository repository;

    public UserDTO addUser(UserDTO dto) {
        User user = mapper.toUserEntity(dto);
        User entity=repository.save(user);
        log.info("UserList created: {}", user.toString());

        return mapper.toUserDTO(entity);
    }

    public UserDTO updateUser(UserDTO dto) throws Exception {

        User origEntity = repository.findById(dto.getId()).orElseThrow(Exception::new);
        mapper.updateEntity(dto, origEntity);
        repository.save(origEntity);
        log.info("UserList updated: {}", origEntity.toString());

        return dto;
    }

    public UserDTO getUserByUsername(String username) throws Exception {
        User entity = repository.findByUsername(username).orElseThrow(Exception::new);
        UserDTO dto = mapper.toUserDTO(entity);
        log.info("UserList retrieved: {}", entity.toString());

        return dto;
    }

    public UserDTO getUser(UUID id) throws Exception {
        User origEntity = repository.findById(id).orElseThrow(Exception::new);
        log.info("UserList retrieved: {}", origEntity.toString());

        UserDTO dto = mapper.toUserDTO(origEntity);
        return dto;
    }

    public List<UserDTO> getAllUser() {
        List<User> userList = repository.findAll();
        log.info("UserList list retrieved: {}", userList.toString());
        return mapper.toDTOList(userList);
    }

    public UUID deleteUser(UUID id) throws Exception {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            log.info("User deleted: {}", id.toString());

        } else {
            throw new Exception();
        }
        return id;
    }

    public List<UserDTO> deleteUsers(List<UserDTO> users) {
        repository.deleteAll(mapper.toEntityList(users));
        log.info("UserList deleted: {}", users.toString());
        return users;
    }

    public String deleteUserByUsername(String username) throws Exception {
        if (repository.existsByUsername(username)) {
            repository.deleteByUsername(username);
            log.info("UserList deleted: {}", username);

        } else {
            throw new Exception();
        }
        return username;
    }

}
