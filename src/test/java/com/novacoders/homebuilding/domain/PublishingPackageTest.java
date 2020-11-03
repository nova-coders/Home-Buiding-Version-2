package com.novacoders.homebuilding.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.novacoders.homebuilding.web.rest.TestUtil;

public class PublishingPackageTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PublishingPackage.class);
        PublishingPackage publishingPackage1 = new PublishingPackage();
        publishingPackage1.setId(1L);
        PublishingPackage publishingPackage2 = new PublishingPackage();
        publishingPackage2.setId(publishingPackage1.getId());
        assertThat(publishingPackage1).isEqualTo(publishingPackage2);
        publishingPackage2.setId(2L);
        assertThat(publishingPackage1).isNotEqualTo(publishingPackage2);
        publishingPackage1.setId(null);
        assertThat(publishingPackage1).isNotEqualTo(publishingPackage2);
    }
}
