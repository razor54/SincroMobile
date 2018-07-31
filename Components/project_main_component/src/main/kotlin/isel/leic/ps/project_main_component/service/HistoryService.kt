package isel.leic.ps.project_main_component.service

import isel.leic.ps.project_main_component.domain.model.Event
import isel.leic.ps.project_main_component.domain.model.History
import isel.leic.ps.project_main_component.exceptions.*
import isel.leic.ps.project_main_component.handlers.NotificationHandler
import isel.leic.ps.project_main_component.repository.EventRepository
import isel.leic.ps.project_main_component.repository.HistoryRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.stream.Collectors


@Service
class HistoryService {

    var logger: Logger = LoggerFactory.getLogger(EventService::class.simpleName)

    @Autowired
    lateinit var historyRepository: HistoryRepository


    fun addHistoryElement(history: History) {
        // TODO maybe based on vehicle and then get driver Id

        logger.debug("Started to add history element")

        try {

           historyRepository.save(history)

        } catch (e: Exception) {

           //TODO throw related exception
            throw FailedToAddEventException()
        }
    }


    fun getHistoryForUser(id: Int): List<History> {
        logger.debug("Started to get history")

        try{
            val history = historyRepository.findAllByDriverId(id)

            return history
        }catch (e:Exception){
            //TODO
            throw InvalidDelegationException()
        }


    }

}



