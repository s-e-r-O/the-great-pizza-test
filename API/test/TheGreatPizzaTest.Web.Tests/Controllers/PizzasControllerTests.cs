using AutoFixture;
using AutoFixture.Xunit2;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using TheGreatPizzaTest.Application.DTOs;
using TheGreatPizzaTest.Application.Interfaces;
using TheGreatPizzaTest.Application.Models;
using TheGreatPizzaTest.Web.Controllers;
using TheGreatPizzaTest.Web.Exceptions;
using Xunit;

namespace TheGreatPizzaTest.Web.Tests.Controllers
{
    public class PizzasControllerTests
    {
        private readonly Mock<IPizzaService> _mockPizzaService;
        private readonly Mock<IPizzaToppingService> _mockPizzaToppingService;
        private readonly Fixture _fixture;
        public PizzasControllerTests()
        {
            _mockPizzaService = new Mock<IPizzaService>();
            _mockPizzaToppingService = new Mock<IPizzaToppingService>();
            _fixture = new Fixture();
        }

        [Fact]
        public async Task GetAll_ReturnsOK_WithIEnumerablePizzaDto()
        {
            // ARRANGE
            _mockPizzaService.Setup(service => service.GetPizzasAsync())
                .Returns(Task.FromResult(_fixture.CreateMany<PizzaDto>()));
            var controller = Initialize();

            // ACT
            var result = await controller.GetAll();

            // ASSERT
            Assert.IsType<OkObjectResult>(result.Result);
            Assert.IsAssignableFrom<IEnumerable<PizzaDto>>(((OkObjectResult)result.Result).Value);
        }

        [Fact]
        public async Task GetById_ReturnsOK_WithPizzaDto()
        {
            // ARRANGE
            _mockPizzaService.Setup(service => service.GetPizzaByIdAsync(It.IsAny<int>()))
                .Returns(Task.FromResult(_fixture.Create<PizzaDto>()));
            var controller = Initialize();

            // ACT
            var result = await controller.GetById(_fixture.Create<int>());

            // ASSERT
            Assert.IsType<OkObjectResult>(result.Result);
            Assert.IsType<PizzaDto>(((OkObjectResult)result.Result).Value);
        }

        [Fact]
        public async Task GetById_ThrowsNotFoundException()
        {
            // ARRANGE
            _mockPizzaService.Setup(service => service.GetPizzaByIdAsync(It.IsAny<int>()))
                .Returns(Task.FromResult<PizzaDto>(null));
            var controller = Initialize();

            // ACT & ASSERT
            await Assert.ThrowsAsync<NotFoundException>(() => controller.GetById(_fixture.Create<int>()));
        }

        [Theory, AutoData]
        public async Task PostPizza_ReturnsCreatedAtAction_WithPizzaDto(CreatePizzaModel pizza)
        {
            // ARRANGE
            var mockServiceResult = _fixture.Create<PizzaDto>();
            _mockPizzaService.Setup(service => service.Create(pizza))
                .Returns(Task.FromResult(mockServiceResult));
            var controller = Initialize();

            // ACT
            var result = await controller.PostPizza(pizza);

            // ASSERT
            Assert.IsType<CreatedAtActionResult>(result.Result);
            Assert.IsType<PizzaDto>(((CreatedAtActionResult)result.Result).Value);
            Assert.Equal(mockServiceResult, ((CreatedAtActionResult)result.Result).Value);
        }

        [Theory, AutoData]
        public async Task PutPizza_ReturnsOk(UpdatePizzaModel pizza)
        {
            // ARRANGE
            _mockPizzaService.Setup(service => service.Update(It.IsAny<UpdatePizzaModel>()))
                .Returns(Task.FromResult(0));
            var controller = Initialize();

            // ACT
            var result = await controller.PutPizza(pizza.Id.Value, pizza);

            // ASSERT
            _mockPizzaService.Verify(service => service.Update(pizza), Times.Once());
            Assert.IsType<OkResult>(result);
        }

        [Theory, AutoData]
        public async Task PutPizza_ThrowsUnmatchedIdsException(UpdatePizzaModel pizza)
        {
            // ARRANGE
            var mockDifferentId = pizza.Id.Value + 1;
            var controller = Initialize();

            // ACT & ASSERT
            await Assert.ThrowsAsync<UnmatchedIdsException>(() => controller.PutPizza(mockDifferentId, pizza));
        }

        [Fact]
        public async Task DeletePizza_ReturnsOk()
        {
            // ARRANGE
            _mockPizzaService.Setup(service => service.Delete(It.IsAny<int>()))
                .Returns(Task.FromResult(0));
            var controller = Initialize();
            var mockId = _fixture.Create<int>();

            // ACT
            var result = await controller.DeletePizza(mockId);

            // ASSERT
            _mockPizzaService.Verify(service => service.Delete(mockId), Times.Once());
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task GetToppingsForPizza_ReturnsOK_WithIEnumerableIngredientDto()
        {
            // ARRANGE
            _mockPizzaService.Setup(service => service.GetPizzaByIdAsync(It.IsAny<int>()))
                .Returns(Task.FromResult(_fixture.Create<PizzaDto>()));
            _mockPizzaToppingService.Setup(service => service.GetToppingsForPizza(It.IsAny<int>()))
                .Returns(Task.FromResult(_fixture.CreateMany<IngredientDto>()));
            var controller = Initialize();

            // ACT
            var result = await controller.GetToppingsForPizza(_fixture.Create<int>());

            // ASSERT
            Assert.IsType<OkObjectResult>(result.Result);
            Assert.IsAssignableFrom<IEnumerable<IngredientDto>>(((OkObjectResult)result.Result).Value);
        }

        [Fact]
        public async Task GetToppingsForPizza_ThrowsNotFoundException()
        {
            // ARRANGE
            _mockPizzaService.Setup(service => service.GetPizzaByIdAsync(It.IsAny<int>()))
                .Returns(Task.FromResult<PizzaDto>(null));
            var controller = Initialize();

            // ACT & ASSERT
            await Assert.ThrowsAsync<NotFoundException>(() => controller.GetToppingsForPizza(_fixture.Create<int>()));
        }

        [Theory, AutoData]
        public async Task AddToppingToPizza_ReturnsOk(int pizzaId, int ingredientId)
        {
            // ARRANGE
            _mockPizzaToppingService.Setup(service => service.AddToppingToPizza(It.IsAny<int>(), It.IsAny<int>()))
                .Returns(Task.FromResult(0));
            var controller = Initialize();

            // ACT
            var result = await controller.AddToppingToPizza(pizzaId, ingredientId);

            // ASSERT
            _mockPizzaToppingService.Verify(service => service.AddToppingToPizza(pizzaId, ingredientId), Times.Once());
            Assert.IsType<OkResult>(result);
        }

        [Theory, AutoData]
        public async Task DeleteToppingFromPizza_ReturnsOk(int pizzaId, int ingredientId)
        {
            // ARRANGE
            _mockPizzaToppingService.Setup(service => service.DeleteToppingFromPizza(It.IsAny<int>(), It.IsAny<int>()))
                .Returns(Task.FromResult(0));
            var controller = Initialize();

            // ACT
            var result = await controller.DeleteToppingFromPizza(pizzaId, ingredientId);

            // ASSERT
            _mockPizzaToppingService.Verify(service => service.DeleteToppingFromPizza(pizzaId, ingredientId), Times.Once());
            Assert.IsType<OkResult>(result);
        }

        private PizzasController Initialize()
        {
            return new PizzasController(_mockPizzaService.Object, _mockPizzaToppingService.Object);
        }
    }
}
