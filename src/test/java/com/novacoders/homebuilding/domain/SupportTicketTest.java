package com.novacoders.homebuilding.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.novacoders.homebuilding.web.rest.TestUtil;

public class SupportTicketTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupportTicket.class);
        SupportTicket supportTicket1 = new SupportTicket();
        supportTicket1.setId(1L);
        SupportTicket supportTicket2 = new SupportTicket();
        supportTicket2.setId(supportTicket1.getId());
        assertThat(supportTicket1).isEqualTo(supportTicket2);
        supportTicket2.setId(2L);
        assertThat(supportTicket1).isNotEqualTo(supportTicket2);
        supportTicket1.setId(null);
        assertThat(supportTicket1).isNotEqualTo(supportTicket2);
    }
}
