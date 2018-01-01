package maxb.pro.trello.repository;

import maxb.pro.trello.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Long> {
}
