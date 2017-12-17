package maxb.pro.trello.repository;

import maxb.pro.trello.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    AppUser findOneByEmail(String email);
}