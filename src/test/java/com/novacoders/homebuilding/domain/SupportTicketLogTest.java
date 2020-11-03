package com.novacoders.homebuilding.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.novacoders.homebuilding.web.rest.TestUtil;

public class SupportTicketLogTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupportTicketLog.class);
        SupportTicketLog supportTicketLog1 = new SupportTicketLog();
        supportTicketLog1.setId(1L);
        SupportTicketLog supportTicketLog2 = new SupportTicketLog();
        supportTicketLog2.setId(supportTicketLog1.getId());
        assertThat(supportTicketLog1).isEqualTo(supportTicketLog2);
        supportTicketLog2.setId(2L);
        assertThat(supportTicketLog1).isNotEqualTo(supportTicketLog2);
        supportTicketLog1.setId(null);
        assertThat(supportTicketLog1).isNotEqualTo(supportTicketLog2);
    }
}
