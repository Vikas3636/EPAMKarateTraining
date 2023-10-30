@karate
Feature: Regress site curd operations

  Background: Configure url
    * def siteUrl = "https://reqres.in/"

  @APITest
  Scenario: Regress site get operation
    Given url siteUrl+"/api/users?page=2"
    And method get
    Then status 200

  @APITest
  Scenario: Regress site post operation
    Given url siteUrl+"/api/users"
    And request
    """
    {
    "name": "morpheus",
    "job": "leader"
    }
    """
    When method post
    Then status 201
    Then match response ==
    """
    {
    "name": "morpheus",
    "job": "leader",
    "id": '#string',
    "createdAt": "#string"
    }
    """

  @APITest
  Scenario: Regress site update operation
    Given url siteUrl+"/api/users/2"
    And request
    """
    {
    "name": "morpheus",
    "job": "zion resident"
    }
    """
    When method put
    Then status 200
    Then match response ==
    """
    {
    "name": "morpheus",
    "job": "zion resident",
    "updatedAt": "#string"
    }
    """

  @APITest
  Scenario: Regress site update operation
    Given url siteUrl+"/api/users/2"
    When method delete
    Then status 204