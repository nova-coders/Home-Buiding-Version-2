package com.novacoders.homebuilding.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.novacoders.homebuilding.web.rest.TestUtil;

public class ProfessionalProfileUserTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfessionalProfileUser.class);
        ProfessionalProfileUser professionalProfileUser1 = new ProfessionalProfileUser();
        professionalProfileUser1.setId(1L);
        ProfessionalProfileUser professionalProfileUser2 = new ProfessionalProfileUser();
        professionalProfileUser2.setId(professionalProfileUser1.getId());
        assertThat(professionalProfileUser1).isEqualTo(professionalProfileUser2);
        professionalProfileUser2.setId(2L);
        assertThat(professionalProfileUser1).isNotEqualTo(professionalProfileUser2);
        professionalProfileUser1.setId(null);
        assertThat(professionalProfileUser1).isNotEqualTo(professionalProfileUser2);
    }
}
