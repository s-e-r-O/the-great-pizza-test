using AutoFixture;
using AutoFixture.Xunit2;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using TheGreatPizzaTest.Application.DTOs;
using TheGreatPizzaTest.Application.Interfaces;
using TheGreatPizzaTest.Application.Models;
using TheGreatPizzaTest.Web.Controllers;
using TheGreatPizzaTest.Web.Exceptions;
using Xunit;

namespace TheGreatPizzaTest.Web.Tests.Controllers
{
    public class IngredientsControllerTests
    {
        private readonly Mock<IIngredientService> _mockIngredientService;
        private readonly Fixture _fixture;
        public IngredientsControllerTests()
        {
            _mockIngredientService = new Mock<IIngredientService>();
            _fixture = new Fixture();
        }

        [Fact]
        public async Task GetAll_ReturnsOK_WithIEnumerableIngredientDto()
        {
            // ARRANGE
            _mockIngredientService.Setup(service => service.GetIngredientsAsync())
                .Returns(Task.FromResult(_fixture.CreateMany<IngredientDto>()));
            var controller = Initialize();

            // ACT
            var result = await controller.GetAll();

            // ASSERT
            Assert.IsType<OkObjectResult>(result.Result);
            Assert.IsAssignableFrom<IEnumerable<IngredientDto>>(((OkObjectResult)result.Result).Value);
        }

        [Fact]
        public async Task GetById_ReturnsOK_WithIngredientDto()
        {
            // ARRANGE
            _mockIngredientService.Setup(service => service.GetIngredientByIdAsync(It.IsAny<int>()))
                .Returns(Task.FromResult(_fixture.Create<IngredientDto>()));
            var controller = Initialize();

            // ACT
            var result = await controller.GetById(_fixture.Create<int>());

            // ASSERT
            Assert.IsType<OkObjectResult>(result.Result);
            Assert.IsType<IngredientDto>(((OkObjectResult)result.Result).Value);
        }

        [Fact]
        public async Task GetById_ThrowsNotFoundException()
        {
            // ARRANGE
            _mockIngredientService.Setup(service => service.GetIngredientByIdAsync(It.IsAny<int>()))
                .Returns(Task.FromResult<IngredientDto>(null));
            var controller = Initialize();

            // ACT & ASSERT
            await Assert.ThrowsAsync<NotFoundException>(() =>  controller.GetById(_fixture.Create<int>()));
        }

        [Theory, AutoData]
        public async Task PostIngredient_ReturnsCreatedAtAction_WithIngredientDto(CreateIngredientModel ingredient)
        {
            // ARRANGE
            var mockServiceResult = _fixture.Create<IngredientDto>();
            _mockIngredientService.Setup(service => service.Create(ingredient))
                .Returns(Task.FromResult(mockServiceResult));
            var controller = Initialize();

            // ACT
            var result = await controller.PostIngredient(ingredient);

            // ASSERT
            Assert.IsType<CreatedAtActionResult>(result.Result);
            Assert.IsType<IngredientDto>(((CreatedAtActionResult)result.Result).Value);
            Assert.Equal(mockServiceResult, ((CreatedAtActionResult)result.Result).Value);
        }

        [Theory, AutoData]
        public async Task PutIngredient_ReturnsOk(UpdateIngredientModel ingredient)
        {
            // ARRANGE
            _mockIngredientService.Setup(service => service.Update(It.IsAny<UpdateIngredientModel>()))
                .Returns(Task.FromResult(0));
            var controller = Initialize();

            // ACT
            var result = await controller.PutIngredient(ingredient.Id.Value, ingredient);

            // ASSERT
            _mockIngredientService.Verify(service => service.Update(ingredient), Times.Once());
            Assert.IsType<OkResult>(result);
        }

        [Theory, AutoData]
        public async Task PutIngredient_ThrowsUnmatchedIdsException(UpdateIngredientModel ingredient)
        {
            // ARRANGE
            var mockDifferentId = ingredient.Id.Value + 1;
            var controller = Initialize();

            // ACT & ASSERT
            await Assert.ThrowsAsync<UnmatchedIdsException>(() => controller.PutIngredient(mockDifferentId, ingredient));
        }

        [Fact]
        public async Task DeleteIngredient_ReturnsOk()
        {
            // ARRANGE
            _mockIngredientService.Setup(service => service.Delete(It.IsAny<int>()))
                .Returns(Task.FromResult(0));
            var controller = Initialize();
            var mockId = _fixture.Create<int>();

            // ACT
            var result = await controller.DeleteIngredient(mockId);

            // ASSERT
            _mockIngredientService.Verify(service => service.Delete(mockId), Times.Once());
            Assert.IsType<OkResult>(result);
        }

        private IngredientsController Initialize()
        {
            return new IngredientsController(_mockIngredientService.Object);
        }
    }
}
