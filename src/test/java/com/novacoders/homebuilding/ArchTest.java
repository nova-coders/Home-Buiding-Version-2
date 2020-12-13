package com.novacoders.homebuilding;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {


    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.novacoders.homebuilding");

        noClasses()
            .that()
                .resideInAnyPackage("com.novacoders.homebuilding.service..")
            .or()
                .resideInAnyPackage("com.novacoders.homebuilding.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..com.novacoders.homebuilding.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
