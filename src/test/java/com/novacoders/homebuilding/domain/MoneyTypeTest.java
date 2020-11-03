package com.novacoders.homebuilding.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.novacoders.homebuilding.web.rest.TestUtil;

public class MoneyTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MoneyType.class);
        MoneyType moneyType1 = new MoneyType();
        moneyType1.setId(1L);
        MoneyType moneyType2 = new MoneyType();
        moneyType2.setId(moneyType1.getId());
        assertThat(moneyType1).isEqualTo(moneyType2);
        moneyType2.setId(2L);
        assertThat(moneyType1).isNotEqualTo(moneyType2);
        moneyType1.setId(null);
        assertThat(moneyType1).isNotEqualTo(moneyType2);
    }
}
